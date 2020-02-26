import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { networks } from '../utils/networks'
import Title from '../components/Title'
import LoadingDot from '../components/LoadingDot'
import Jazzicon from '@novaviva/react-native-jazzicon'
import { sendTransaction } from '../utils/Tools'

class Sending extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sendTx: '等待...',
            receipt: '等待...'
        }
    }
    componentDidMount = () => {
        this.setState({ sendTx: '发送中...' })
        setTimeout(() => {
            this.handleSendTransaction()
        }, 2000)
    }
    handleSendTransaction = () => {
        const { networkId , currentAccount , mnemonic} = this.props.WalletReducer
        const { myGasPrice, amount, note, toAddress,  gasLimit } = this.props.SendReducer
        const networkName = networks[networkId].nameEN
        sendTransaction(toAddress, networkName, mnemonic, currentAccount, amount, gasLimit, myGasPrice, note).then((tx)=>{
            this.props.setTX(tx)
            this.setState({ sendTx: '成功!', receipt: '确认中...' })
            tx.wait().then((receipt)=>{
                this.props.setReceipt(receipt)
                this.setState({ receipt: '成功!' })
                this.props.handleTurnPage(1)
            })
        })
        
    }
    componentDidUpdate(nextProps, nextState) {
        if (nextState.sendTx !== this.state.sendTx) {
            return true
        } else if (nextState.receipt !== this.state.receipt) {
            return true
        } else {
            return false
        }
    }
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Title titleText='转账中...' style={styles.Title} />
                <View style={styles.divide}></View>

                <View style={styles.TxView}>
                    <View style={styles.jazzIcon}><Jazzicon size={30} address={this.props.SendReducer.fromAddress} /></View>
                    <LoadingDot />
                    <View style={styles.jazzIcon}><Jazzicon size={30} address={this.props.SendReducer.toAddress} /></View>
                </View>
                <View style={styles.msgView}>
                    <View style={styles.msg}>
                        <Text style={styles.msgTxt}>发送交易:</Text>
                        <Text style={styles.msgTxt}>{this.state.sendTx}</Text>
                    </View>
                    <View style={styles.msg}>
                        <Text style={styles.msgTxt}>等待确认:</Text>
                        <Text style={styles.msgTxt}>{this.state.receipt}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        height: 36,
        textAlignVertical: 'center',
        color: '#333'
    },
    divide: {
        borderWidth: 0.35,
        borderColor: '#000',
        borderRadius: 1,
        borderStyle: 'dashed',
        marginBottom: 10,
        width: '100%'
    },
    jazzIcon: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TxView: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100
    },
    msgView: {
        height: 100,
        width: 200,
    },
    msg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    msgTxt: {
        color: '#333'
    }
})
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setTX: (value) => dispatch(actions.setTX(value)),
    setReceipt: (value) => dispatch(actions.setReceipt(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Sending)