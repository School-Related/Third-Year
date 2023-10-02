from manim import *
import manimpango

manimpango.list_fonts()


class CreateCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set the color and transparency
        self.play(Create(circle))  # show the circle on screen


class SquareToCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        circle.set_fill(PINK, opacity=0.5)  # set color and transparency

        square = Square()  # create a square
        square.rotate(PI / 4)  # rotate a certain amount

        self.play(Create(square))  # animate the creation of the square
        self.play(Transform(square, circle))  # interpolate the square into the circle
        self.play(FadeOut(square))  # fade out animation


class AnimatedSquareToCircle(Scene):
    def construct(self):
        circle = Circle()  # create a circle
        square = Square()  # create a square

        self.play(Create(square))  # show the square on screen
        self.play(square.animate.rotate(PI / 4))  # rotate the square
        self.play(
            ReplacementTransform(square, circle)
        )  # transform the square into a circle
        self.play(
            circle.animate.set_fill(PINK, opacity=0.5)
        )  # color the circle on screen


class SingleLineColor(Scene):
    def construct(self):
        text = MarkupText(
            f'all in red <span fgcolor="{YELLOW}">except this</span>', color=RED
        )
        self.add(text)


class HelloLaTeX(Scene):
    def construct(self):
        tex = Tex(r"\LaTeX", font_size=50, color=RED).to_edge(UL) 
        # self.play(Write(tex))
        author = Tex("Author's name")
        self.play(Write(author), Write(tex), run_time=3)
        newTex = Tex("Hello, This is Digital Forensics and Investigation", font_size = 40, color=ORANGE)
        newTex.next_to(author, DOWN)
        self.play(Transform(author, newTex), run_time=1.5)
        
class Myscene(Scene):
    def construct(self):
        text1 = Text(
            "This is a text created using the Manim library",
            color=LIGHT_PINK,
            font_size=40,
        )
        self.play(Write(text1), runtime=5)
        self.wait(5)
        self.play(FadeOut(text1))
        text2 = Tex("This is a text created using LaTeX.", color=WHITE, font_size=40)
        self.play(Write(text2), runtime=5)
        self.wait(5)
        self.play(FadeOut(text2))
        text3 = MathTex(
            r"\begin{bmatrix} f(\epsilon_1) \\ f(\epsilon_2) \\ f(\epsilon_3) \\ \vdots \end{bmatrix}",
            color=BLUE,
            font_size=120,
        )
        self.play(Write(text3), runtime=5)
        self.wait(5)
        self.play(FadeOut(text3))

class MyScene(Scene):
    def construct(self):
        self.camera.background_color = '#ece6e2'
        text = Text("Hello, world!", color=BLACK, font_size=40).to_edge(DOWN)
        print(type(text))
        self.play(Write(text))
        self.play(text.animate.shift(UP), run_time = 2)
        self.wait()