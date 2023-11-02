from manim import *
import manimpango


manimpango.list_fonts()

colors = {
    "bg" : "#000000",
    "text" : "#e6f2e4",
    "accent" : "#918ff0",
    "neutral" : "#63311d",
}

class MainSlide( Scene ) :
    def construct( self ) :
        self.camera.background_color = colors[ "bg" ]
        tex = Tex( r"Aritificial Intelligence and Machine learning", font_size = 50, color = colors[ "text" ] ).to_edge( UP )
        sem = Tex( r"Semester 4, TY. B. Tech, Cybersecurity and Forensics", font_size = 40, color = colors[ "text" ] ).next_to( tex, DOWN )
        act = Tex( r"Active Learning", font_size = 40, color = colors[ "text" ] ).next_to( sem, DOWN )
        self.play( Write( tex ), Write( sem ), Write(act), run_time = 2 )
        title = Tex( "Understanding Neural Networks", font_size = 60, color = colors[ "accent" ] ).center()
        self.play( Write( title ), run_time = 3.5 )
        
        # now put a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "text" ] )
        self.play( Create( box ), run_time = 2 )
        
        author_name = Tex( "By: ", font_size = 40, color = colors[ "text" ] ).next_to( title, DOWN * 3 )
        author = Tex( "Krishnaraj, Parth, Sourab, and Saubhagya", font_size = 40, color = colors[ "text" ] ).next_to( author_name, DOWN )
        roll_no = Tex( "PA10, PA07, PA25, PA24", font_size = 40, color = colors[ "text" ] ).next_to( author, DOWN )
        self.play( Write( author_name ), Write( author ), Write( roll_no ), run_time = 2 )
        self.wait( 1 )
        # fade out
        self.play( FadeOut( author_name ), FadeOut( author ), FadeOut( roll_no ), FadeOut(act), FadeOut( title ), FadeOut( tex ), FadeOut( sem ), run_time = 2 )
        # now uncreate the box
        self.play( Uncreate( box ), run_time = 1 )
        self.wait( 2 )


class ParthIntro( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Artificial Neural Networks and Their Terminology", font_size = 55, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "PA07. Parth Zarekar", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class Perceptron( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Introduction to Perceptrons", font_size = 60, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Single and Multi Layer Perceptrons", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class ArchBackProp( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Architecture of Back Propagation", font_size = 60, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "PA25. Sourab Karad", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class CFWI( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Cost Function and Weights Initialization", font_size = 60, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Role, Definition, Formulas and Working", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class CaseStudy( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Case Study on Image Enhancement with Keras", font_size = 60, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "PA10. Krishnaraj Thadesar", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class Conclusion( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "The Conclusion", font_size = 60, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Thank you so much for Listening!", font_size = 40, color = colors[
            "text" ]).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

