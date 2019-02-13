d=$(date "+%Y/%m/%e")

mkdir -p $d
echo $(curl http://localhost:5000/report/transactions/reality) > $d/transactions.json
echo $(curl http://localhost:5000/report/budget/reality) > $d/budget.json
echo $(curl http://localhost:5000/report/stats/reality) > $d/stats.json
echo $(curl http://localhost:5000/report/balances/reality) > $d/balances.json
