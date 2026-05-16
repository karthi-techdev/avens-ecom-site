import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

export interface ShippingMethod {
  _id: string;
  name: string;
  price: number;
  description: string
}

interface ShippingState {
  shipmentMethods: ShippingMethod[];
  selectedShipment: ShippingMethod | null;
  isLoading: boolean;
  error: string | null;

  fetchShipmentMethods: () => Promise<void>;
  setSelectedShipment: (method: ShippingMethod) => void;
}

export const useShippingStore = create<ShippingState>((set) => ({
  shipmentMethods: [],
  selectedShipment: null,
  isLoading: false,
  error: null,


fetchShipmentMethods: async () => {
  set({ isLoading: true, error: null });

  try {
    const res = await apiClient.get(
  `${API.listShippingMethods}?status=active`
);

    let data: ShippingMethod[] = [];


    if (Array.isArray(res.data?.data?.data)) {
      data = res.data.data.data;
    }

    console.log("Final Shipment Data:", data); // debug

    set({
      shipmentMethods: data,
      isLoading: false,
    });
  } catch (err: any) {
    set({
      error: err?.message || "Failed to fetch shipping",
      isLoading: false,
    });
  }
},

  setSelectedShipment: (method) => {
    set({ selectedShipment: method });
  },

  
}));
const res = await apiClient.get(API.listShippingMethods);
console.log("API RESPONSE 👉", res.data);