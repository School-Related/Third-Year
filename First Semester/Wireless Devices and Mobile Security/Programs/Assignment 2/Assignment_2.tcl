#initialize the variables
set val(chan)           Channel/WirelessChannel    ;#Channel Type
set val(prop)           Propagation/TwoRayGround   ;# radio-propagation model
set val(netif)          Phy/WirelessPhy      ;# network interface type WAVELAN DSSS 2.4GHz
set val(mac)            Mac/802_11                 ;# MAC type
set val(ifq)            Queue/DropTail/PriQueue    ;# interface queue type
set val(ll)             LL                         ;# link layer type
set val(ant)            Antenna/OmniAntenna        ;# antenna model
set val(ifqlen)         50                         ;# max packet in ifq
set val(nn)             2                          ;# number of mobilenodes
set val(rp)             AODV                       ;# routing protocol
set val(x)  500   ;# in metres
set val(y)  500   ;# in metres
#Adhoc OnDemand Distance Vector

#creation of Simulator
set ns [new Simulator]

#creation of Trace and namfile 
set tracefile [open wireless_2.tr w]
$ns trace-all $tracefile

#Creation of Network Animation file
set namfile [open wireless_2.nam w]
$ns namtrace-all-wireless $namfile $val(x) $val(y)

#create topography
set topo [new Topography]
$topo load_flatgrid $val(x) $val(y)

#GOD Creation - General Operations Director
create-god $val(nn)

set channel1 [new $val(chan)]

#configure the node
$ns node-config -adhocRouting $val(rp) \
  -llType $val(ll) \
  -macType $val(mac) \
  -ifqType $val(ifq) \
  -ifqLen $val(ifqlen) \
  -antType $val(ant) \
  -propType $val(prop) \
  -phyType $val(netif) \
  -topoInstance $topo \
  -agentTrace ON \
  -macTrace ON \
  -routerTrace ON \
  -movementTrace ON \
  -channel $channel1 

set n0 [$ns node]
set n1 [$ns node]


$n0 random-motion 0
$n1 random-motion 0



$ns initial_node_pos $n0 20
$ns initial_node_pos $n1 20


#initial coordinates of the nodes 
$n0 set X_ 10.0
$n0 set Y_ 20.0
$n0 set Z_ 0.0



$n1 set X_ 430.0
$n1 set Y_ 320.0
$n1 set Z_ 0.0


#Dont mention any values above than 500 because in this example, we use X and Y as 500,500

#mobility of the nodes
#At what Time? Which node? Where to? at What Speed?
$ns at 1.0 "$n0 setdest 490.0 340.0 25.0"
$ns at 1.0 "$n1 setdest 300.0 130.0 5.0"

#the nodes can move any number of times at any location during the simulation (runtime)
$ns at 20.0 "$n1 setdest 100.0 200.0 30.0"

#creation of agents
set tcp [new Agent/TCP]
set sink [new Agent/TCPSink]
$ns attach-agent $n0 $tcp

$ns attach-agent $n1 $sink
$ns connect $tcp $sink
set ftp [new Application/FTP]
$ftp attach-agent $tcp
$ns at 1.0 "$ftp start"


#set udp [new Agent/UDP]
#set null [new Agent/Null]
#$ns attach-agent $n2 $udp
#$ns attach-agent $n3 $null
#$ns connect $udp $null
#set cbr [new Application/Traffic/CBR]
#$cbr attach-agent $udp
#$ns at 1.0 "$cbr start"


$ns at 30.0 "finish"

proc finish {} {
 global ns tracefile namfile
 $ns flush-trace
 close $tracefile
 close $namfile
 exit 0
}

puts "Starting Simulation"
$ns run