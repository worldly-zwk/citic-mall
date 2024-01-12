import { useCallback, useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Notice, Form, Card, Radio, Input, Typography } from '@/components';
import { useOrder } from '@/store';
import { OrderInvoiceScreenProps } from '@/typings';
import {
  INVOICE_CONTENT_ENUM,
  INVOICE_CONTENT_OPTIONS,
  INVOICE_NAME_OPTIONS,
  INVOICE_TYPE_OPTIONS,
  InvoiceContentEnum,
  InvoiceNameEnum,
  InvoiceTypeEnum
} from './constants';

interface InvoiceStore extends Omit<API.Invoice, 'invoiceType' | 'invoiceProperty'> {
  type: InvoiceTypeEnum;
  name: InvoiceNameEnum;
  content: InvoiceContentEnum;
}

const OrderInvoice = ({ route, navigation }: OrderInvoiceScreenProps) => {
  const form = Form.useForm();
  const invoice = useOrder(state => state.invoice);
  const setInvoice = useOrder(state => state.setInvoice);
  const type = Form.useWatch('type', form);
  const name = Form.useWatch('name', form);
  const content = Form.useWatch('content', form);
  const invoicing = content === InvoiceContentEnum.DETAIL;

  const initialValues = useMemo<InvoiceStore>(() => {
    const { invoiceType, invoiceProperty, ...restInvoice } = invoice;
    let type = InvoiceTypeEnum.GENERAL;
    let name = InvoiceNameEnum.PERSONAL;
    let content = InvoiceContentEnum.NULL;

    if (invoiceType) {
      content = InvoiceContentEnum.DETAIL;

      if (invoiceType === 2) {
        name = InvoiceNameEnum.CORPORATE;
      }

      if (invoiceProperty === 2 && invoiceType !== 3) {
        type = InvoiceTypeEnum.ELECTRONIC;
      }

      if (invoiceType === 3) {
        type = InvoiceTypeEnum.PROFESSIONAL;
      }
    }

    return {
      type,
      name,
      content,
      ...restInvoice,
    }
  }, [invoice]);

  const handleFinish = useCallback(() => {
    const { type, name, content, ...restValues } = form.getFieldsValue();
    let invoiceType = 0;
    let invoiceProperty = 2;

    if (content === InvoiceContentEnum.DETAIL) {
      invoiceType = 1;
      if (name === InvoiceNameEnum.CORPORATE) {
        invoiceType = 2;
      }

      if (type === InvoiceTypeEnum.ELECTRONIC) {
        invoiceProperty = 1;
      }

      if (type === InvoiceTypeEnum.PROFESSIONAL) {
        invoiceType = 3;
      }
    }

    setInvoice({
      invoiceType,
      invoiceProperty,
      invoiceTitle: '个人发票',
      invoiceContent: INVOICE_CONTENT_ENUM.get(content) as string,
      ...restValues,
    });

    navigation.navigate('Order');
  }, [setInvoice]);

  const renderInvoiceName = () => {
    if (type === InvoiceTypeEnum.PROFESSIONAL) {
      return (
        <>
          <Form.Item name="invoiceTitle">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入单位名称（必填）" />
          </Form.Item>
          <Form.Item name="taxpayerCode">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入15或18位纳税人识别号（必填）" />
          </Form.Item>
          <Form.Item name="registAddress">
            <Input size="middle" style={styles.input} bordered={false} placeholder="请输入注册地址（必填）" />
          </Form.Item>
          <Form.Item name="registTelephone">
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
        {name === InvoiceNameEnum.CORPORATE && (
          <>
            <Form.Item name="invoiceTitle">
              <Input size="middle" style={styles.input} bordered={false} placeholder="请输入单位名称" />
            </Form.Item>
            <Form.Item name="taxpayerCode">
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
          {(invoicing && type !== InvoiceTypeEnum.GENERAL) && (
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
