import { Card, Skeleton, Space, Typography } from '@/components';

const { Text } = Typography;

interface OrderAddressProps {
  loading?: boolean;
  address?: API.Address;
}


const OrderAddress = ({ loading, address }: OrderAddressProps) => {
  return (
    <Card>
      <Skeleton loading={loading} text={{ rows: 3 }} style={{ padding: 0 }}>
        <Space size={14} align="center">
          <Text strong>{address?.memberName}</Text>
          <Text strong>{address?.mobile}</Text>
        </Space>
        <Text color="secondary">{address?.addAll} {address?.addressInfo}</Text>
      </Skeleton>
    </Card>
  )
}

export default OrderAddress;
