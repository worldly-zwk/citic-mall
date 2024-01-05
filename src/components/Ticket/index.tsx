import { ImageBackground, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';
import Space from '../Space';
import Tag from '../Tag';

const { Text, Price } = Typography;

interface TicketProps extends ViewProps {
  ticket?: {
    name: string;
    value: number;
    remark?: string;
    useScope: string;
    minAmount?: number;
    useStartTime: string;
    useEndTime: string;
  }
  disabled?: boolean;
}

const Ticket = (props: TicketProps) => {
  const { style, ticket, ...restProps } = props;
  return (
    <ImageBackground source={require('@/assets/images/view/ticket.png')} resizeMode="stretch" style={[styles.container, style]} {...restProps}>
      <Space style={styles.ticket}>
        <View style={styles.money}>
          <Price size={20} style={styles.price} unitStyle={{ marginBottom: 4 }}>{ticket?.value}</Price>
          <Text size="mini">满{ticket?.minAmount}元可用</Text>
        </View>
        <View style={styles.content}>
          <Typography tag={<Tag>满减券</Tag>}>
            <Text indent={7} strong="600" numberOfLines={1}>{ticket?.name}</Text>
          </Typography>
          <Text size="small">{ticket?.useScope}</Text>
          <Text size="small">{ticket?.useStartTime.slice(0,10).replace(/-/ig,'.')} ~ {ticket?.useEndTime.slice(0,10).replace(/-/ig,'.')}</Text>
        </View>
      </Space>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 7,
  },
  ticket: {
    flex: 1,
  },
  money: {
    width: '24.8%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  price: {
    height: 32,
    // marginBottom: 3,
    // paddingVertical: 6,
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 8,
    // backgroundColor: 'green'
  }
})

export default Ticket;

