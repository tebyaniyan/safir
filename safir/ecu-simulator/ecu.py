import time, random, json, requests

current_global_diag = ['Oil Sensor Error', 'Pile Sensor Error', 'Electric Error', "AirBag Error", "Gasoline Sensor Error"]
car_id = 1
headers = {'content-type': 'application/text'}

with open("F:/Projects/Safir/ecu-simulator/data.db", "r") as raw_data_loc:
    my_raw_data = raw_data_loc.read()

re_locs = my_raw_data.split('\n')

def check_stop(get_json_data):

    print('action')

    while True:

        url = 'http://192.168.110.51:26321/wcf/omidservice.svc/LocationInsert'
        response = requests.post(url, data=get_json_data, headers=headers)

        if response.text.lower() == "stop":
            print("Stop2")
            pass

        elif response.text.lower() == "done":
            print("done")
            break

        time.sleep(1)

    return True


class VisualizeTesting:

    def __init__(self):

        self.current_time = time.strftime("%Y/%m/%d, %H:%M:%S", time.localtime(time.time()))

        self.global_location_Longitude = 51.39207666666666
        self.current_location_Latitude = 35.716220
        self.current_location_longitude = 51.288275
        self.current_speed = 100
        self.current_speed_2 = 0
        self.current_acceleration = 0
        self.current_speed_global = 100
        self.current_fuel = 50
        self.current_engine_temperature = 30
        self.current_diag_counter = random.choice([5,3,19,25,18])
        self.current_diag = []
        self.global_kilometers = 23092

    def update_time(self):

        self.current_time = time.strftime("%Y/%m/%d, %H:%M:%S", time.localtime(time.time()))

    def update_location(self, get_len_p):

        # self.current_location_longitude = self.current_location_longitude - (self.current_speed / 3.6)/10**5.7
        pass

    def update_fuel(self):

        self.current_fuel = (self.current_location_longitude - self.global_location_Longitude) * (7 / 1000)

    def speed_range(self):

        my_random_list_1 = [0.5,0.25,0.75,0.65,0.95]
        my_random_list_2 = [-1,-2,-3,0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19]

        my_chance_1 = random.choice(my_random_list_1)
        my_chance_2 = random.choice(my_random_list_2)

        self.current_speed = self.current_speed_global + (my_chance_1*my_chance_2)

    def update_engine_temperature(self):

        self.current_engine_temperature = self.current_engine_temperature + 0.05

    def update_diag(self):

        self.current_diag_counter = self.current_diag_counter + 1

        if (self.current_diag_counter % 25) == 0:

            random_choice_number = random.choice([1, 2, 3, 4])
            my_new_list = random.sample(current_global_diag, random_choice_number)
            self.current_diag = my_new_list

        else:
            self.current_diag = ["None"]

    def update_global_kilometers(self):

        self.global_kilometers = self.global_kilometers + (((self.current_location_longitude - self.global_location_Longitude)*2)/1000)

    def update_acceleration(self):

        self.current_acceleration = (self.current_speed - self.current_speed_2) / self.time
        self.current_acceleration = random.choice([10,11,12,14,9,8,1,52,0,30,40,1,2,13,14,16])

    def call_all(self):

        for i in range(0, 865):

            self.update_time()
            self.speed_range()

            # self.update_location(get_len_p)

            self.current_location_longitude = float(re_locs[i].split(',')[1])
            self.current_location_Latitude = float(re_locs[i].split(',')[0])

            self.update_fuel()
            self.update_engine_temperature()
            self.update_diag()
            # self.update_acceleration()
            self.update_global_kilometers()

            my_errors_code = {'Oil Sensor Error': 1, 'Pile Sensor Error': 2, 'Electric Error': 3, "AirBag Error": 4, "Gasoline Sensor Error": 5, "None": 404}

            buffer_last = []
            for items in self.current_diag:

                if my_errors_code[items] == 404:
                    pass
                else:
                    make_dict_options = {"Code": my_errors_code[items], "Description": items}
                    buffer_last.append(make_dict_options)

            last_list = {"CarID": car_id, "Date": self.current_time, "Map_Lat": self.current_location_Latitude, "Map_Lng": self.current_location_longitude,
                         "Speed": self.current_speed, "Acceleration": 0, "Fuel": self.current_fuel, "Temperature": self.current_engine_temperature,
                         "Kilometers": self.global_kilometers, "Errors": buffer_last}

            last_data_to_json = json.dumps(last_list)

            url = 'http://192.168.43.152:26321/wcf/omidservice.svc/LocationInsert'
            response = requests.post(url, data=last_data_to_json, headers=headers)
            print(response.text, i)
            # print(response.text)
            time.sleep(1)
            # print(i)


make_new_object = VisualizeTesting()
make_new_object.call_all()