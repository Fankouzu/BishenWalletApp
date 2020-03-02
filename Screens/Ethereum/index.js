import React from 'react'
import {
    View,
} from 'react-native'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import BalanceCard from './Components/BalanceCard'
import Copyright from '../Components/Copyright'
import MyBackButton from '../Components/MyBackButton'
import MyBackground from '../Components/MyBackground'
import PasswordModal from '../Components/PasswordModal'

class EthereumDapp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passworModaldAction:''
        }
    }
    componentDidMount = async () => {

    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    showPasswordModal = (passworModaldAction) => {
        this.props.setSendPasswordModalVisiable(true)
        this.setState({ passworModaldAction: passworModaldAction })
    }
    passwordAction = () => {
        if (this.state.passworModaldAction === 'send') {
            this.openSend()
        }
    }
    openSend = () => {
        this.props.setSendPasswordModalVisiable(false)
        this.props.navigation.navigate('Send')
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <MyBackground>
                <View style={{ flexDirection: 'column' }}>
                    <MyBackButton
                        onPress={() => { navigate('MainScreen') }}
                    />
                    <BalanceCard
                        navigation={this.props.navigation}
                        showPasswordModal={this.showPasswordModal}
                    />
                </View>
                <Copyright />
                <PasswordModal
                    passwordAction={this.passwordAction}
                    passworModaldAction={this.state.passworModaldAction}
                    openSend={this.openSend}
                    setVisiable={this.props.setSendPasswordModalVisiable}
                    isVisible={this.props.WalletMain.isSendPasswordModalVisible}
                />
            </MyBackground>
        )
    }
}
const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setSendPasswordModalVisiable: (value) => dispatch(actions.setSendPasswordModalVisiable(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EthereumDapp)