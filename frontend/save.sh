d=$(date "+%Y/%m/%e")

mkdir -p $d
echo $(curl https://adder-api.herokuapp.com/report/transactions/reality) > $d/transactions.json
echo $(curl https://adder-api.herokuapp.com/report/budget/reality) > $d/budget.json
echo $(curl https://adder-api.herokuapp.com/report/stats/reality) > $d/stats.json
echo $(curl https://adder-api.herokuapp.com/report/balances/reality) > $d/balances.json
echo $(curl https://adder-api.herokuapp.com/report/bills/reality) > $d/bills.json
