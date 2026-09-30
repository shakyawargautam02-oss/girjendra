import turtle
import colorsys

# Screen setup
screen = turtle.Screen()
screen.bgcolor("#000")
screen.title("Python Spiral Animation")

# Turtle setup
t = turtle.Turtle()
t.speed(0)  # Maximum speed
turtle.tracer(0, 0)  # Animation ko fast karne ke liye
t.hideturtle()

# Animation variables
hue = 0.0

# Drawing loop
for i in range(8000):
    # Dynamic color change
    color = colorsys.hsv_to_rgb(hue, 1.0, 1.0)
    t.pencolor(color)
    hue += 0.005
    
    # Movement & Pattern logic
    t.forward(i * 3 / 2 + i)
    t.left(120)  # Spiral angle
    
    # Screen update
    turtle.update()

# Screen open rakhne ke liye
turtle.done()