import { Card, Space, Typography } from '@/components';

const { Text } = Typography;

interface OrderAddressProps {
  address?: API.Address;
}


const OrderAddress = ({ address }: OrderAddressProps) => {
  return (
    <Card>
      <Space size={14} align="center">
        <Text strong>{address?.memberName}</Text>
        <Text strong>{address?.mobile}</Text>
      </Space>
      <Text color="secondary">{address?.addAll} {address?.addressInfo}</Text>
    </Card>
  )
}

export default OrderAddress;
