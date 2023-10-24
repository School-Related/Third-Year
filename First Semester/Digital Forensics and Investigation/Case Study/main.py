from manim import *
import manimpango


manimpango.list_fonts()

colors = {
    "bg" : "#1a1a1a",
    "text" : "#e6f2e4",
    "accent" : "#f27756",
    "neutral" : "#63311d",
}

class CreateCircle( Scene ) :
    def construct( self ) :
        circle = Circle()  # create a circle
        circle.set_fill( PINK, opacity = 0.5 )  # set the color and transparency
        self.play( Create( circle ) )  # show the circle on screen

class SquareToCircle( Scene ) :
    def construct( self ) :
        circle = Circle()  # create a circle
        circle.set_fill( PINK, opacity = 0.5 )  # set color and transparency
        
        square = Square()  # create a square
        square.rotate( PI / 4 )  # rotate a certain amount
        
        self.play( Create( square ) )  # animate the creation of the square
        self.play( Transform( square, circle ) )  # interpolate the square into the circle
        self.play( FadeOut( square ) )  # fade out animation

class AnimatedSquareToCircle( Scene ) :
    def construct( self ) :
        circle = Circle()  # create a circle
        square = Square()  # create a square
        
        self.play( Create( square ) )  # show the square on screen
        self.play( square.animate.rotate( PI / 4 ) )  # rotate the square
        self.play(
                ReplacementTransform( square, circle )
        )  # transform the square into a circle
        self.play(
                circle.animate.set_fill( PINK, opacity = 0.5 )
        )  # color the circle on screen

class SingleLineColor( Scene ) :
    def construct( self ) :
        text = MarkupText(
                f'all in red <span fgcolor="{YELLOW}">except this</span>', color = RED
        )
        self.add( text )

class HelloLaTeX( Scene ) :
    def construct( self ) :
        tex = Tex( r"\LaTeX", font_size = 50, color = RED ).to_edge( UL )
        # self.play(Write(tex))
        author = Tex( "Author's name" )
        self.play( Write( author ), Write( tex ), run_time = 3 )
        newTex = Tex( "Hello, This is Digital Forensics and Investigation", font_size = 40, color = ORANGE )
        newTex.next_to( author, DOWN )
        self.play( Transform( author, newTex ), run_time = 1.5 )

class Myscene( Scene ) :
    def construct( self ) :
        text1 = Text(
                "This is a text created using the Manim library",
                color = LIGHT_PINK,
                font_size = 40,
        )
        self.play( Write( text1 ), runtime = 5 )
        self.wait( 5 )
        self.play( FadeOut( text1 ) )
        text2 = Tex( "This is a text created using LaTeX.", color = WHITE, font_size = 40 )
        self.play( Write( text2 ), runtime = 5 )
        self.wait( 5 )
        self.play( FadeOut( text2 ) )
        text3 = MathTex(
                r"\begin{bmatrix} f(\epsilon_1) \\ f(\epsilon_2) \\ f(\epsilon_3) \\ \vdots \end{bmatrix}",
                color = BLUE,
                font_size = 120,
        )
        self.play( Write( text3 ), runtime = 5 )
        self.wait( 5 )
        self.play( FadeOut( text3 ) )

class MyScene3( Scene ) :
    def construct( self ) :
        self.camera.background_color = '#0B0705'
        text = Text( "Hello, world!", color = BLACK, font_size = 40 ).to_edge( DOWN )
        print( type( text ) )
        self.play( Write( text ) )
        self.play( text.animate.shift( UP ), run_time = 2 )
        self.wait()

class MainSlide( Scene ) :
    def construct( self ) :
        self.camera.background_color = colors[ "bg" ]
        tex = Tex( r"Digital Forensics and Investigation", font_size = 50, color = colors[ "text" ] ).to_edge( UP )
        sem = Tex( r"Semester 4, TY. B. Tech, Cybersecurity and Forensics", font_size = 40, color = colors[ "text" ] ).next_to( tex, DOWN )
        self.play( Write( tex ), Write( sem ), run_time = 2 )
        title = Tex( "The Story of Torrenting", font_size = 80, color = colors[ "accent" ] ).center()
        self.play( Write( title ), run_time = 3.5 )
        
        # now put a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "neutral" ] )
        self.play( Create( box ), run_time = 2 )
        
        author_name = Tex( "By: ", font_size = 40, color = colors[ "text" ] ).next_to( title, DOWN * 3 )
        author = Tex( "Krishnaraj Thadesar", font_size = 40, color = colors[ "text" ] ).next_to( author_name, RIGHT )
        roll_no = Tex( "Roll No: PA10", font_size = 40, color = colors[ "text" ] ).next_to( author, DOWN )
        self.play( Write( author_name ), Write( author ), Write( roll_no ), run_time = 2 )
        self.wait( 1 )
        # fade out
        self.play( FadeOut( author_name ), FadeOut( author ), FadeOut( roll_no ), FadeOut( title ), FadeOut( tex ), FadeOut( sem ), run_time = 2 )
        # now uncreate the box
        self.play( Uncreate( box ), run_time = 1 )
        self.wait( 2 )
