// CIDADÃO$ — Module 05: Marketplace / Shopping
// Priority Commercial Core: Stores, products, cart, checkout sandbox and commissions

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { DEMO_PRODUCTS } from '../../data/demoData';
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  CheckCircle,
  X,
  CreditCard,
  QrCode,
  Wallet,
  ArrowLeft,
  Star,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    createOrder,
    orders,
    closeModule,
    user,
    wallet,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [search, setSearch] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Checkout form state
  const [deliveryModal, setDeliveryModal] = useState<'lancha_rapida' | 'courier' | 'retirada'>('lancha_rapida');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(`${user.neighborhoodOrCommunity}, ${user.address}`);
  const [paymentMethod, setPaymentMethod] = useState<'pix_sandbox' | 'mrt_wallet' | 'cartao_sandbox'>('pix_sandbox');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'Alimentos Regionais', label: 'Alimentos Regionais' },
    { key: 'Ferramentas & Náutica', label: 'Náutica & Rabetas' },
    { key: 'Energia Solar', label: 'Energia Solar' },
    { key: 'Artesanato & Bioeconomia', label: 'Artesanato & Bio' },
  ];

  const freightCost = deliveryModal === 'lancha_rapida' ? 18.0 : deliveryModal === 'courier' ? 10.0 : 0.0;
  const finalTotal = cartTotal + freightCost;

  const filteredProducts = DEMO_PRODUCTS.filter((prod) => {
    if (selectedCategory !== 'todos' && prod.category !== selectedCategory) return false;
    if (search && !prod.name.toLowerCase().includes(search.toLowerCase()) && !prod.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = createOrder({
        customerMpuid: user.mpuid,
        items: cart,
        totalAmount: finalTotal,
        freightCost,
        freightModal: deliveryModal,
        deliveryAddress,
        paymentMethod,
        status: 'em_separacao',
      });

      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setOrderSuccess(newOrder.id);
    }, 700);
  };

  return (
    <div className="bg-[#F3F6FA] min-h-full pb-16">
      {/* Module Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={closeModule}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8A00] bg-amber-50 px-1.5 py-0.5 rounded">
                Módulo 05
              </span>
              <h2 className="font-extrabold text-base text-[#163047]">Marketplace Local</h2>
            </div>
            <p className="text-[11px] text-slate-500">Comércio integrado de Manacapuru & produtores</p>
          </div>
        </div>

        {/* Cart Icon Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-xl bg-amber-50 text-[#FF8A00] hover:bg-amber-100 transition-colors"
          title="Ver Carrinho"
        >
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#009B4D] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Success Notification Banner */}
      {orderSuccess && (
        <div className="m-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start justify-between shadow-xs animate-in fade-in">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-emerald-950">Pedido Confirmado no Sandbox!</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Código: <strong className="font-mono text-emerald-900">{orderSuccess}</strong>. Lojista notificado para separação.
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                ⭐ Você ganhou +{Math.floor(finalTotal * 0.1)} pontos na Carteira MRT$!
              </p>
            </div>
          </div>
          <button
            onClick={() => setOrderSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search & Categories */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar produtos, rabetas, açaí, farinha..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#FF8A00] shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-[#FF8A00] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="relative h-32 w-full overflow-hidden bg-slate-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-[#009B4D] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block truncate">
                  {product.storeName}
                </span>
                <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 mt-0.5">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
                  <span className="text-[9px] text-slate-400">({product.reviewCount})</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 line-through block">
                    {product.originalPrice ? `R$ ${product.originalPrice.toFixed(2)}` : ''}
                  </span>
                  <span className="font-black text-sm text-[#009B4D]">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="p-1.5 rounded-lg bg-[#FF8A00] hover:bg-[#ea580c] text-white active:scale-95 shadow-xs"
                  title="Adicionar ao carrinho"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[#FF8A00]" />
                <h3 className="font-bold text-base text-slate-900">Seu Carrinho ({cart.length})</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <ShoppingCart className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">Seu carrinho está vazio</p>
                  <p className="text-xs mt-1">Explore os produtos de Manacapuru</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="pt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.product.name}</h4>
                        <span className="text-[11px] font-bold text-[#009B4D]">
                          R$ {item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => addToCart(item.product, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.product, 1)}
                          className="p-1 text-slate-500 hover:text-slate-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-900 font-extrabold pt-1 border-t border-slate-200">
                  <span>Total estimado</span>
                  <span className="text-[#009B4D] font-black">R$ {cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  <span>Avançar para o Checkout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#072F58] to-[#0756A6] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300">Checkout Sandbox</span>
                <h3 className="font-extrabold text-base">Finalizar Pedido</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
              {/* Delivery Modal */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Modal de Entrega Amazônica:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryModal('lancha_rapida')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryModal === 'lancha_rapida'
                        ? 'border-[#0756A6] bg-blue-50/70 text-[#0756A6] font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="block text-[11px]">🚤 Lancha Fluvial</span>
                    <span className="text-[10px] text-slate-500">R$ 18,00</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryModal('courier')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryModal === 'courier'
                        ? 'border-[#0756A6] bg-blue-50/70 text-[#0756A6] font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="block text-[11px]">🛵 Courier Urbano</span>
                    <span className="text-[10px] text-slate-500">R$ 10,00</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryModal('retirada')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryModal === 'retirada'
                        ? 'border-[#0756A6] bg-blue-50/70 text-[#0756A6] font-bold ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="block text-[11px]">📦 Retirar no Porto</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Grátis</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Localidade / Endereço de Entrega:
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#0756A6]"
                  placeholder="Ex: Comunidade do Supiá, Atracadouro 02"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Forma de Pagamento (Ambiente Seguro Demonstrativo):
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'pix_sandbox'}
                      onChange={() => setPaymentMethod('pix_sandbox')}
                      className="text-[#009B4D]"
                    />
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-800">PIX Sandbox Instantâneo</span>
                      <span className="block text-[10px] text-slate-400">QR Code dinâmico gerado na hora</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'mrt_wallet'}
                      onChange={() => setPaymentMethod('mrt_wallet')}
                      className="text-[#009B4D]"
                    />
                    <Wallet className="w-4 h-4 text-[#0756A6]" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-800">Carteira Digital MRT$ / Benefício</span>
                      <span className="block text-[10px] text-slate-400">
                        Saldo Benefício: R$ {wallet.municipalBenefitBalance.toFixed(2)} | Teste: R$ {wallet.sandboxFiatBalance.toFixed(2)}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cartao_sandbox'}
                      onChange={() => setPaymentMethod('cartao_sandbox')}
                      className="text-[#009B4D]"
                    />
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-800">Cartão de Crédito (Demo)</span>
                      <span className="block text-[10px] text-slate-400">Até 3x sem juros no comércio parceiro</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal produtos</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete ({deliveryModal === 'lancha_rapida' ? 'Lancha Solimões' : deliveryModal === 'courier' ? 'Courier' : 'Retirada'})</span>
                  <span>R$ {freightCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-slate-900 pt-1 border-t border-slate-200 text-sm">
                  <span>Valor Total</span>
                  <span className="text-[#009B4D]">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#009B4D] hover:bg-[#006B3C] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processando autorização...</span>
                ) : (
                  <span>Confirmar Pedido (R$ {finalTotal.toFixed(2)})</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Orders History Drawer Toggle */}
      {orders.length > 0 && (
        <div className="p-4 mt-4">
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <h4 className="font-bold text-xs text-slate-800 mb-2">Seus Pedidos no Marketplace ({orders.length})</h4>
            <div className="space-y-2">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="p-2.5 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-[11px] text-slate-900">{ord.id}</span>
                    <span className="block text-[10px] text-slate-500">{ord.createdAt}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#009B4D] text-xs">R$ {ord.totalAmount.toFixed(2)}</span>
                    <span className="block text-[9px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded mt-0.5">
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
