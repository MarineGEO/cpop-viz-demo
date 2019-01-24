import random
import csv
import datetime
import time

# output file name for random numbers
filename = "random_dice_generator.csv"


# writes the header (overwrites any existing files)
with open(filename, 'w') as f:
    wr = csv.writer(f, dialect='excel')
    wr.writerow(['Timestamp', 'row', 'dice1', 'dice2', 'sum', 'product'])


# set the limit and counter for the while loop
limit = 3600
i = 1

while i < limit:
    dice1 = random.randint(1,6)  # random integer between 1 and 6 (aka a dice roll)
    dice2 = random.randint(1,6)  # random integer between 1 and 6 (aka a dice roll)
    sum = dice1 + dice2
    product = dice1 * dice2
    row = [datetime.datetime.now(), i, dice1, dice2, sum, product] # creates the row of data
    print(row)

    # append the row to the csv file
    # kind of a silly way to do this but want to save the file so dropbox uploads it
    # in order to simulate sensor data from real time monitors
    with open(filename, 'a') as f:
        wr = csv.writer(f, dialect='excel')
        wr.writerow(row)

    # sleep for x seconds
    time.sleep(2)

    # add to the counter
    i += 1
