while true
do
echo Healthy Checking
x=`./command.sh status|grep stop|wc -l`
   echo $x
   if [ $x -eq 1 ]
   then
        echo "stoped let start"
	    ./command.sh start --force
   fi
   sleep 10
done









