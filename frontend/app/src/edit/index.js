import React, { Component } from "react";
import { getTransactions, updateTransaction, newTransaction, deleteTransaction, getAccounts, updateAccount } from "../api"
import { Modal, Paper } from "@material-ui/core"
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Edit extends Component {
    state = {
        txs: [],
        schedule: {},
        accounts: []
    }

    constructor(props) {
        super(props)
        this.changeTx = this.changeTx.bind(this)
        this.getData = this.getData.bind(this)
        this.changeSchedule = this.changeSchedule.bind(this)
        this.changeAc = this.changeAc.bind(this)
    }

    async getData() {
        let data = await getTransactions()
        let acs = await getAccounts()
        this.setState({ txs: data, accounts: acs })
    }

    async componentWillMount() {
        this.getData()
    }

    changeAc(i, key) {
        return e => {
            let value = e.target.value
            if (["balance"].includes(key)) value = Number(value)
            const { accounts } = this.state;
            accounts[i][key] = value
            this.setState({ acs: accounts })
            if (accounts[i]._id) updateAccount(accounts[i]._id.$oid, accounts[i])
        }
    }
    
    changeTx(i, key) {
        return e => {
            let value = e.target.value
            if(["value", "monthly_value"].includes(key)) value = Number(value)
            const { txs } = this.state;
            txs[i][key] = value
            this.setState({ txs })
            if (txs[i]._id) updateTransaction(txs[i]._id.$oid, txs[i])
        }
    }

    changeSchedule(key, interval) {
        if (interval) {
            return value => {
                const { selected } = this.state;
                selected.schedule["interval"][key] = Number(value.target.value)
                this.setState({ selected })
            }
        }
        return value => {
            const { selected } = this.state;
            selected.schedule[key] = value
            this.setState({ selected })
        }
    }

    render() {
        const { txs } = this.state;
        const { selected } = this.state;
        if (selected) {
            if (!selected.schedule) {
                selected.schedule = {}
            }
            if (!selected.schedule.start) {
                selected.schedule.start = 0
            }
        }
        
        return <div>
            <h1>Edit</h1>
            <a href="/">Home</a>
            <button onClick={() => {
                newTransaction({}).then(this.getData)
            }}>Add</button>
            <div style={{ marginTop: 10 }}>
                {this.state.txs.map((tx, i) => {
                    tx = txs[i]
                    return <div style={{ padding: "0px 10px" }}>
                        <input style={{ display: "block", float: "left" }} placeholder="name" value={tx.name} onChange={this.changeTx(i, "name")}></input>
                        <input style={{ display: "block", float: "left" }} placeholder="value" type="number" value={tx.value} onChange={this.changeTx(i, "value")}></input>
                        <input style={{ display: "block", float: "left" }} placeholder="monthly value" type="number" value={tx["monthly_value"]} onChange={this.changeTx(i, "monthly_value")}></input>
                        <input style={{ display: "block", float: "left" }} placeholder="category" value={tx.category} onChange={this.changeTx(i, "category")}></input>
                        <button onClick={() => this.setState({ selected: tx })}>Schedule</button>
                        <button style={{ margin: 0 }} onClick={() => {
                            deleteTransaction(tx._id.$oid).then(this.getData)
                        }}>Delete</button>
                    </div>
                })}
            </div>
            <h1>Accounts</h1>
            <div style={{ marginTop: 10 }}>
                {this.state.accounts.map((ac, i) => {
                    return <div style={{ padding: 10 }}>
                        <input style={{ display: "block", float: "left" }} placeholder="name" value={ac.name} onChange={this.changeAc(i, "name")}></input>
                        <input style={{ display: "block", float: "left" }} placeholder="balance" type="number" value={ac.balance} onChange={this.changeAc(i, "balance")}></input>
                    </div>
                })}
            </div>
            <Modal
                style={{ width: "50vw", postiion: "fixed", left: "25vw", top: 150 }}
                onClose={() => this.setState({ selected: false, schedule: {} })} open={selected || false}
            >
                <Paper style={{padding: 25}}>
                    {selected && selected.schedule && <div>
                        <h1>{selected.name}</h1>
                        <DatePicker
                            selected={new Date(selected.schedule.start * 1000)}
                            onChange={e => {
                                this.changeSchedule("start")(e.getTime() / 1000)
                            }}
                        />
                        {selected.category !== "once" && <div>
                            <DatePicker
                                selected={new Date(selected.schedule.end * 1000)}
                                onChange={e => {
                                    this.changeSchedule("end")(e.getTime() / 1000)
                                }}
                            />
                            <input placeholder="days" value={selected.schedule.interval.days} onChange={this.changeSchedule("days", true)} />
                            <input placeholder="months" value={selected.schedule.interval.months} onChange={this.changeSchedule("months", true)} />
                        </div>
                        }
                    </div>}

                    <button onClick={() => {
                        updateTransaction(selected._id.$oid, { schedule: this.state.selected.schedule })
                        this.setState({selected: false, schedule: {}})
                    }}>Submit</button>
                </Paper>
            </Modal>
        </div>
    }
}

export default Edit