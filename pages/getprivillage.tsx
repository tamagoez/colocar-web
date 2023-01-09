export default function GetPrivillage() {
  return (
    <>
      <h1>管理者以外はアクセスしないでください</h1>
      <button
        onClick={() => {
          localStorage.setItem("adminunlock", "true");
        }}
      >
        ロックを解除する
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("adminunlock");
        }}
      >
        ロックする
      </button>
    </>
  );
}
