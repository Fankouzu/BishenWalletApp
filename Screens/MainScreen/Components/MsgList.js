import React from 'react'
import * as actions from '../../../actions'
import { connect } from 'react-redux'
import { Text, StyleSheet, View } from 'react-native'
import Jazzicon from '@novaviva/react-native-jazzicon'
import MyCard from '../../Components/MyCard'
import { I18n } from '../../../i18n'
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/Fontisto'
//var moment = require('moment')

const styles = StyleSheet.create({
    msgView: {
        marginVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        width: '100%',
    },
    msgViewTitle: {
        color: '#666',
        marginBottom: 10,
        paddingLeft: 5,
    },
    listItem: {
        borderTopColor: '#ccc',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    title: {
        color: '#666',
        marginLeft: 5,
        height: 30,
        textAlignVertical: 'center',
    },
    Line: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    jazzIcon: {
        width: 30,
        justifyContent: 'center',
        marginRight: 10,
    },
    TypeView: {
        justifyContent: 'center',
    },
    Empty: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
    },
    address: {
        fontSize: 10,
    },
    right: {
        position: 'absolute',
        right: 0,
        height: 30,
        justifyContent: 'center',
    },
})


function MsgList(props) {

    const [msgList, setMsgList] = React.useState({ error: -1, result: [] })

    React.useEffect(() => {
        setMsgList(props.WalletMain.msgList)
    }, [props.WalletMain.msgList])

    return (
        <View style={styles.msgView}>
            <Text style={styles.msgViewTitle}>{I18n.t('MsgListTitle')}</Text>
            <MyCard
                screenWidth={global.screenWidth * 0.95}
                margin={0}
                top={0}
                style={{ padding: 0, marginBottom: 50 }}
            >
                {msgList.error === -1 ?
                    (<View style={styles.listItem}>
                        <Text style={styles.Empty}>
                            {I18n.t('MsgLoading')}
                        </Text>
                    </View>
                    ) : msgList.error === 0 ?
                        (<View style={styles.listItem}>
                            <Text style={styles.Empty}>
                                {I18n.t('EmptyMsg')}
                            </Text>
                        </View>
                        ) : (msgList.result.map((item, index) => {
                            return (
                                <Ripple
                                    onPress={() => { props.navigation.navigate('Chat', { toUser: item.address }) }}
                                    style={[
                                        styles.listItem, {
                                            borderTopWidth: index > 0 ? 0.5 : 0,
                                        }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.jazzIcon}>
                                            <Jazzicon size={30} address={item.address} />
                                        </View>
                                        <View style={styles.TypeView}>
                                            <Text style={styles.address}>{item.profile[0] === '' ? item.address : item.profile[0]}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Icon name="angle-right" size={14} color={'#999'} />
                                        </View>
                                    </View>
                                    <View style={styles.Line} />
                                </Ripple>
                            )
                        }))}
            </MyCard>
        </View>
    )
}



const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => ({
    setShowBalanceLoading: (value) => dispatch(actions.setShowBalanceLoading(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MsgList)

