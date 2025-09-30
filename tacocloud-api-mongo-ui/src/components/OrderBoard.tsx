import { FormEvent, useEffect, useState } from 'react';
import { Order } from '../apiClient';
import { addOrder, orders$, refreshOrders, tacos$ } from '../store';
import { useObservable } from '../hooks';

const initialOrder: Order = {
  deliveryName: '',
  deliveryStreet: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryZip: '',
  ccNumber: '',
  ccExpiration: '',
  ccCVV: '',
  tacos: []
};

export const OrderBoard = () => {
  const orders = useObservable(orders$, []);
  const tacos = useObservable(tacos$, []);
  const [candidate, setCandidate] = useState<Order>(initialOrder);
  const [selectedTacoId, setSelectedTacoId] = useState('');

  useEffect(() => {
    refreshOrders();
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (candidate.tacos.length === 0) {
      return;
    }
    addOrder(candidate);
    setCandidate(initialOrder);
    setSelectedTacoId('');
  };

  const updateField = (field: keyof Order, value: string) => {
    setCandidate((current) => ({ ...current, [field]: value }));
  };

  const addTacoToOrder = () => {
    if (!selectedTacoId) {
      return;
    }
    const taco = tacos.find((t) => t.id === selectedTacoId);
    if (!taco) {
      return;
    }
    setCandidate((current) => ({ ...current, tacos: [...current.tacos, taco] }));
  };

  return (
    <section>
      <h2>Orders</h2>
      <form onSubmit={onSubmit} className="panel order-form">
        <div className="grid">
          <label>
            Name
            <input value={candidate.deliveryName ?? ''} onChange={(event) => updateField('deliveryName', event.target.value)} />
          </label>
          <label>
            Street
            <input value={candidate.deliveryStreet ?? ''} onChange={(event) => updateField('deliveryStreet', event.target.value)} />
          </label>
          <label>
            City
            <input value={candidate.deliveryCity ?? ''} onChange={(event) => updateField('deliveryCity', event.target.value)} />
          </label>
          <label>
            State
            <input value={candidate.deliveryState ?? ''} onChange={(event) => updateField('deliveryState', event.target.value)} />
          </label>
          <label>
            Zip
            <input value={candidate.deliveryZip ?? ''} onChange={(event) => updateField('deliveryZip', event.target.value)} />
          </label>
        </div>
        <div className="grid">
          <label>
            Card Number
            <input value={candidate.ccNumber ?? ''} onChange={(event) => updateField('ccNumber', event.target.value)} />
          </label>
          <label>
            Expiration (MM/YY)
            <input value={candidate.ccExpiration ?? ''} onChange={(event) => updateField('ccExpiration', event.target.value)} />
          </label>
          <label>
            CVV
            <input value={candidate.ccCVV ?? ''} onChange={(event) => updateField('ccCVV', event.target.value)} />
          </label>
        </div>
        <div className="taco-selector">
          <select value={selectedTacoId} onChange={(event) => setSelectedTacoId(event.target.value)}>
            <option value="">Select taco</option>
            {tacos.map((taco) => (
              <option key={taco.id ?? taco.name} value={taco.id}>
                {taco.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={addTacoToOrder} disabled={!selectedTacoId}>
            Add Taco
          </button>
        </div>
        <div className="selected-tacos">
          {candidate.tacos.map((taco, idx) => (
            <span key={`${taco.id ?? taco.name}-${idx}`} className="chip">
              {taco.name}
            </span>
          ))}
        </div>
        <button type="submit">Place Order</button>
      </form>

      <ul className="orders list">
        {orders.map((order) => (
          <li key={order.id ?? `${order.deliveryName}-${order.placedAt}`}>
            <div>
              <strong>{order.deliveryName}</strong>
              <small>{order.deliveryCity}</small>
            </div>
            <ol>
              {order.tacos.map((taco) => (
                <li key={taco.id ?? taco.name}>{taco.name}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </section>
  );
};
