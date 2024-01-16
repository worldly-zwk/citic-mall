import { useCallback, useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Notice, Form, Card, Radio, Input, Typography } from '@/components';
import { useOrder } from '@/store';
import { InvoiceProperty, InvoiceType, OrderInvoiceScreenProps } from '@/typings';
import {
  INVOICE_CONTENT_ENUM,
  INVOICE_CONTENT_OPTIONS,
  INVOICE_NAME_OPTIONS,
  INVOICE_TYPE_OPTIONS,
  InvoiceContentEnum,
  InvoiceNameEnum,
  InvoiceTypeEnum
} from './constants';

interface InvoiceStore extends Omit<API.Invoice, 'type' | 'property' | 'content'> {
  type: InvoiceTypeEnum;
  name: InvoiceNameEnum;
  content: InvoiceContentEnum;
}

const OrderInvoice = ({ navigation }: OrderInvoiceScreenProps) => {
  const form = Form.useForm();
  const invoice = useOrder(state => state.invoice);
  const setInvoice = useOrder(state => state.setInvoice);
  const type = Form.useWatch('type', form);
  const name = Form.useWatch('name', form);
  const content = Form.useWatch('content', form);
  const invoicing = content === InvoiceContentEnum.DETAIL;

  const initialValues = useMemo<InvoiceStore>(() => {
    const { type, property, ...restInvoice } = invoice;
    let invoiceType = InvoiceTypeEnum.ORDINARY;
    let invoiceTitle = InvoiceNameEnum.PERSONAL;
    let content = InvoiceContentEnum.NULL;

    if (type) {
      content = InvoiceContentEnum.DETAIL;

      if (type === InvoiceType.COMPANY) {
        invoiceTitle = InvoiceNameEnum.COMPANY;
      }

      if (property === InvoiceProperty.ELECTRONIC && type !== InvoiceType.VALUE_ADDED) {
        invoiceType = InvoiceTypeEnum.ELECTRONIC;
      }

      if (type === InvoiceType.VALUE_ADDED) {
        invoiceType = InvoiceTypeEnum.PROFESSIONAL;
      }
    }

    return {
      ...restInvoice,
      type: invoiceType,
      name,
      content,
    }
  }, [invoice]);

  const handleFinish = useCallback(() => {
    const { type, name, content, ...restValues } = form.getFieldsValue();
    let invoiceType = InvoiceType.NONE;
    let invoiceProperty = 0;

    if (content === InvoiceContentEnum.DETAIL) {
      invoiceType = InvoiceType.PERSONAL;
      if (name === InvoiceNameEnum.COMPANY) {
        invoiceType = InvoiceType.COMPANY;
      }

      if (type === InvoiceTypeEnum.ELECTRONIC) {
        invoiceProperty = InvoiceProperty.ELECTRONIC;
      }

      if (type === InvoiceTypeEnum.PROFESSIONAL) {
        invoiceType = InvoiceType.VALUE_ADDED;
      }
    }

    console.log(restValues, )

    setInvoice({
      title: '个人发票',
      ...restValues,
      type: invoiceType,
      property: invoiceProperty,
      content: INVOICE_CONTENT_ENUM.get(content) as string,
    });

    navigation.navigate('Order');
  }, [setInvoice]);

  // TODO 切换时在form中invoiceTitle字段丢了
  const renderInvoiceName = () => {
    if (type === InvoiceTypeEnum.PROFESSIONAL) {
      return (
        <>
          <Form.Item name="title">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入单位名称（必填）" />
          </Form.Item>
          <Form.Item name="taxpayerCode">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入15或18位纳税人识别号（必填）" />
          </Form.Item>
          <Form.Item name="address">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入注册地址（必填）" />
          </Form.Item>
          <Form.Item name="telephone">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入注册电话（必填）" />
          </Form.Item>
          <Form.Item name="bankName">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入开户银行（必填）" />
          </Form.Item>
          <Form.Item name="bankCode">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入开户行帐号（必填）" />
          </Form.Item>
        </>
      )
    }

    return (
      <>
        <Form.Item name="name">
          <Radio.Group options={INVOICE_NAME_OPTIONS} />
        </Form.Item>
        {name === InvoiceNameEnum.COMPANY && (
          <>
            <Form.Item name="title">
              <Input size="middle" style={styles.input} bordered={false} placeholder="请输入单位名称" />
            </Form.Item>
            <Form.Item name="code">
              <Input size="middle" style={styles.input} bordered={false} placeholder="请输入15或18位纳税人识别号" />
            </Form.Item>
          </>
        )}
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Notice>*温馨提示：商家只对订单中非跨境商品金额开具发票。</Notice>
      <ScrollView>
        <Form style={styles.form} form={form} initialValues={initialValues}>
          <Card contentStyle={styles.card}>
            <Typography.Text style={styles.title}>发票类型</Typography.Text>
            <Form.Item name="type">
              <Radio.Group optionType="button" options={INVOICE_TYPE_OPTIONS} />
            </Form.Item>
          </Card>
          {invoicing && (
            <Card contentStyle={styles.card}>
              <Typography.Text style={styles.title}>发票抬头</Typography.Text>
              {renderInvoiceName()}
            </Card>
          )}
          <Card contentStyle={styles.card}>
            <Typography.Text style={styles.title}>发票内容</Typography.Text>
            <Form.Item name="content">
              <Radio.Group options={INVOICE_CONTENT_OPTIONS} />
            </Form.Item>
          </Card>
          {(invoicing && type !== InvoiceTypeEnum.ORDINARY) && (
            <Card contentStyle={styles.card}>
              <Typography.Text style={styles.title}>收票信息</Typography.Text>
              <Form.Item name="invoiceEmail" help="部分商品只支持电子发票，建议填写上述信息，以便商户将发票发送至您的邮箱。">
                <Input size="middle" style={styles.input} bordered={false} placeholder="请输入收票邮箱" />
              </Form.Item>
            </Card>
          )}
        </Form>
      </ScrollView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleFinish}>确定</Button>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    rowGap: 12,
    padding: 12,
  },
  card: {
    paddingBottom: 0,
  },
  title: {
    height: 18,
    marginBottom: 12,
  },
  input: {
    height: 40,
    backgroundColor: '#f5f6fa'
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default OrderInvoice;
