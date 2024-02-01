import { ImageBackground, StyleSheet, View } from 'react-native';
import { Ticket } from '@/typings';
import Typography from '../Typography';
import Space from '../Space';
import Radio, { RadioProps } from '../Radio';
import Link from '../Link';

const { Text } = Typography;

interface CheckTicketProps extends RadioProps {
  ticket: Ticket;
}

const CheckTicket = (props: CheckTicketProps) => {
  const { style, ticket, disabled, ...restProps } = props;

  const ticketType = ticket.type === 1 ? '满减券' : '现金券';
  const containerStyle = [styles.container, style, { opacity: disabled ? .7 : 1 }];
  const colorBlack = disabled ? '#dbdbdb' : '#333';
  const colorPrimary = disabled ? '#dbdbdb' : 'primary';
  const colorDisabled = disabled ? '#dbdbdb' : 'disabled';

  return (
    <Link onPress={restProps.onPress}>
      <ImageBackground source={require('@/assets/images/view/check_ticket.png')} resizeMode="stretch" style={containerStyle}>
        <Space style={styles.content}>
          <Text size={30} color={colorPrimary}>¥{ticket?.value}</Text>
          <View>
            <Text style={styles.value} color={colorPrimary}>[{ticketType}]{ticket.value}元券</Text>
            <Text size="mini" color={colorDisabled}>{ticket?.useTimeScope}</Text>
          </View>
        </Space>
        <View style={styles.extra}>
          <Text size="large" color={colorBlack}>{ticket.name}</Text>
          <Text style={styles.scope} color={colorDisabled}>{ticket.useScope}</Text>
          <Radio style={styles.radio} {...restProps} />
        </View>
      </ImageBackground>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
    paddingTop: 12,
    paddingRight: 2,
    justifyContent: 'space-between'
  },
  extra: {
    flex: 1,
    paddingBottom: 6,
  },
  value: {
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 4,
    textAlign: 'right',
  },
  scope: {
    fontSize: 11,
    lineHeight: 14,
    marginTop: 4,
  },
  radio: {
    position: 'absolute',
    right: 8,
    top: 0,
  }
})

export default CheckTicket;
