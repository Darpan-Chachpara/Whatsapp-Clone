# from math import *

# print("HEeeeeeee2222222222el")
# print(ceil(3.9))



# num1 = float(input("ENTER FIRST NUMBER: "))
# op = input("ENTER OPERATOR :")
# num2 = float(input("ENTER SECOND NUMBER: "))

# if op == "+":
#     print(num1+num2)
# elif op == '-':
#     print(num1-num2)	


# from xmlrpc import client

# server_url = 'http://161.35.52.86:8069'
# db_name = 'transTeg_Dev'
# username = 'admin@gmail.com'
# password = 'admin'

# common = client.ServerProxy('%s/xmlrpc/2/common' % server_url)
# user_id = common.authenticate(db_name, username, password, {})

# if user_id:
#     print("Success: User id is", user_id)
# else:
#     print("Failed: wrong credentials")


import tkinter as tk
import _tkinter
import turtle
from tkinter import *
import matplotlib.pylot as plt

import numpy as np

a=turtle.Turtle()
a.getscreen().bgcolor("yellow")

a.penup()
a.goto(-200,100)
a.pendown()

a.speed(25)

def star(turtle,size):
    if size<=10:
        return
    else:
        turtle.begin_fill()
    for i in range(5):
        turtle.forward(size)
        star(turtle,size/3)
        turtle.left(216)
        turtle.end_fill()
    star(a,360)
    turtle.done()