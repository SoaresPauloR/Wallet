const WalletCard = ({ wallet }) => {
  return (
    <div className="wallet">
      <h3 className="title">Wallet</h3>

      <p className="wallet-value">$ {wallet.value}</p>
    </div>
  );
};

export default WalletCard;
