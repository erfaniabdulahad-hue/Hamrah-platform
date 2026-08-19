export type AppUser = {
  id: string;
  name: string;
  createdAt: string;
};

export type AppOrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export type AppOrder = {
  id: string;
  customerName: string;
  address: string;
  items: AppOrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'completed';
  createdAt: string;
};

type MockStore = {
  users: AppUser[];
  orders: AppOrder[];
};

const STORE_KEY = '__hamrah_mock_store__';

function getStore(): MockStore {
  const globalObject = globalThis as typeof globalThis & { [STORE_KEY]?: MockStore };

  if (!globalObject[STORE_KEY]) {
    globalObject[STORE_KEY] = {
      users: [],
      orders: [],
    };
  }

  return globalObject[STORE_KEY];
}

export function getUserByName(name: string) {
  const normalized = name.trim();
  if (!normalized) return null;

  return getStore().users.find((user) => user.name.toLowerCase() === normalized.toLowerCase()) ?? null;
}

export function upsertUser(name: string): AppUser {
  const trimmed = name.trim();
  const existing = getUserByName(trimmed);
  if (existing) return existing;

  const user: AppUser = {
    id: `u_${Math.random().toString(36).slice(2, 8)}`,
    name: trimmed,
    createdAt: new Date().toISOString(),
  };

  getStore().users.push(user);
  return user;
}

export function createOrder(input: {
  customerName: string;
  address: string;
  items: Array<{ id: string; title: string; price: number; quantity: number }>;
}): AppOrder {
  const total = input.items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const order: AppOrder = {
    id: `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    customerName: input.customerName.trim(),
    address: input.address.trim(),
    items: input.items.map((item) => ({
      id: item.id,
      title: item.title,
      price: Number(item.price) || 0,
      quantity: Math.max(1, Number(item.quantity) || 1),
    })),
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  getStore().orders.push(order);
  return order;
}

export function createPayment(input: { method: string; amount: number }) {
  const amount = Number(input.amount) || 0;
  const method = String(input.method || 'card').trim() || 'card';

  return {
    paymentId: `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    amount,
    method,
    status: amount > 0 ? 'paid' : 'failed',
    createdAt: new Date().toISOString(),
  };
}
