branch=$1

if [[ $branch == "dev" || $branch == "master" ]]
then
        ssh root@185.69.153.62 "source /home/nordlys/deploy/deploy.sh $branch"
else
        echo "'$branch' is not allowed branch name"
        exit 1
fi
