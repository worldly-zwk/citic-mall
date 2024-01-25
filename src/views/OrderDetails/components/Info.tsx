import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Popup, Skeleton, Space, Tag, Typography, Cell } from '@/components';
import { useBoolean } from '@/hooks';

const { Text } = Typography;
const CellGroup = Cell.Group;

const invoiceTypeText = [, '个人发票', '公司发票', '增值税发票'];

interface OrderInfoProps {
  loading?: boolean;
  order?: API.OrderDetails;
}


const OrderInfo = ({ loading, order }: OrderInfoProps) => {
  const invoice = order?.invoiceVo;
  const [visible, actions] = useBoolean(false);

  const renderInvoice = () => {
    if (invoice?.invoiceType) {
      return (
        <>
          <Text color="secondary">发票类型：{invoiceTypeText[invoice.invoiceType]}</Text>
          <Text color="secondary">发票抬头：{invoice.invoiceTitle}</Text>
          <Space align="center" size={12}>
            <Text color="secondary">发票内容：商品明细</Text>
            <TouchableWithoutFeedback onPress={actions.setTrue}>
              <Tag style={styles.bordered} textColor="#50abff">查看发票明细</Tag>
            </TouchableWithoutFeedback>
          </Space>
        </>
      )
    }

    return <Text color="secondary">发票信息：不开发票</Text>
  }

  return (
    <>
      <Card title="订单信息" titleStyle={styles.title} contentStyle={styles.container}>
        <Skeleton loading={loading} text={{ rows: 5 }} style={{ padding: 0 }}>
          <Text color="secondary">订单编号：{order?.orderSn}</Text>
          <Text color="secondary">下单时间：{order?.createTime}</Text>
          <Text color="secondary">下单备注：{order?.memberNotes || '无'}</Text>
          <Text color="secondary">支付方式：{order?.cashPayChannel}</Text>
          {renderInvoice()}
        </Skeleton>
      </Card>
      <Popup visible={visible} title="发票信息" style={styles.popup} bodyStyle={{ paddingVertical: 0 }} onClose={actions.setFalse}>
        <CellGroup>
          <Cell label="发票类型" style={styles.cell}>
            <Text color="secondary">{invoice?.invoiceProperty ? '电子发票' : '纸质发票'}</Text>
          </Cell>
          <Cell label="发票抬头" style={styles.cell}>
            <Text color="secondary">{invoice?.invoiceTitle}</Text>
          </Cell>
          {invoice?.identificationNumber && (
            <Cell label="纳税人识别号" style={styles.cell}>
              <Text color="secondary">{invoice?.identificationNumber}</Text>
            </Cell>
          )}
          <Cell label="发票内容" style={styles.cell}>
            <Text color="secondary">{invoice?.invoiceContent}</Text>
          </Cell>
        </CellGroup>
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  title: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '700',
  },
  bordered: {
    borderColor: '#50abff'
  },
  popup: {
    backgroundColor: '#f5f6fa'
  },
  cell: {
    paddingHorizontal: 0
  }
})

export default OrderInfo;
