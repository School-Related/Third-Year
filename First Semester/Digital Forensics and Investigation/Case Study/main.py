from manim import *
import manimpango


manimpango.list_fonts()

colors = {
    "bg" : "#1a1a1a",
    "text" : "#e6f2e4",
    "accent" : "#f27756",
    "neutral" : "#63311d",
}

class MainSlide( Scene ) :
    def construct( self ) :
        self.camera.background_color = colors[ "bg" ]
        tex = Tex( r"Digital Forensics and Investigation", font_size = 50, color = colors[ "text" ] ).to_edge( UP )
        sem = Tex( r"Semester 4, TY. B. Tech, Cybersecurity and Forensics", font_size = 40, color = colors[ "text" ] ).next_to( tex, DOWN )
        act = Tex( r"Active Learning Case Study", font_size = 40, color = colors[ "text" ] ).next_to( sem, DOWN )
        self.play( Write( tex ), Write( sem ), Write(act), run_time = 2 )
        title = Tex( "The Story of Torrenting", font_size = 80, color = colors[ "accent" ] ).center()
        self.play( Write( title ), run_time = 3.5 )
        
        # now put a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "text" ] )
        self.play( Create( box ), run_time = 2 )
        
        author_name = Tex( "By: ", font_size = 40, color = colors[ "text" ] ).next_to( title, DOWN * 3 )
        author = Tex( "Krishnaraj Thadesar", font_size = 40, color = colors[ "text" ] ).next_to( author_name, RIGHT )
        roll_no = Tex( "Roll No: PA10", font_size = 40, color = colors[ "text" ] ).next_to( author, DOWN )
        self.play( Write( author_name ), Write( author ), Write( roll_no ), run_time = 2 )
        self.wait( 1 )
        # fade out
        self.play( FadeOut( author_name ), FadeOut( author ), FadeOut( roll_no ), FadeOut(act), FadeOut( title ), FadeOut( tex ), FadeOut( sem ), run_time = 2 )
        # now uncreate the box
        self.play( Uncreate( box ), run_time = 1 )
        self.wait( 2 )

class LevalvIllegal( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "The Legal vs the Illegal", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Why should consumers choose the illegal route instead of simply following the laws? ", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class HowTorrentingWorks( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "How Torrenting Works", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Why is it Illegal, and so popular? ", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )


class EarlyDaysOfTorrenting( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Early Days of Torrenting", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "The Rise of Torrenting", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class YifySuccess( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "The Success of Yify Torrents", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "How yify became the most popular search term on torrenting sites.", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class AttemptsToTakeDown( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "Attempts to Take it Down", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "What did the law do to manage this?", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class HowCaught( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "How He was Finally Caught", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "The End is a new beginning.", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class FinalResult( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "The Final Result", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Repercussions and results of the backdoor deal. ", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

class Conclusion( Scene ) :
    def construct( self ) :
        # this slide is only writing the heading of the topic on the screen, and a sub heading
        self.camera.background_color = colors[ "bg" ]
        title = Tex( "The Conclusion", font_size = 80, color = colors[ "accent" ] ).center()
        # also draw a box around the title
        box = SurroundingRectangle( title, buff = .4, color = colors[ "accent" ] )
        self.play( Write( title ), Create( box ), run_time = 2.5 )
        sub_title = Tex( "Thank you so much for Listening!", font_size = 40, color = colors[
            "text" ], width = 250).next_to( title, DOWN * 3 )
        self.play( Write( sub_title ), run_time = 2 )
        self.wait( 2 )
        self.play( FadeOut( title ), FadeOut( sub_title ), Uncreate(box), run_time = 2 )
        self.wait( 2 )

