import "./globals.css";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparant-100">
      <div className="loading-container">
        <div className="rect rect1"></div>
        <div className="rect rect2"></div>
        <div className="rect rect3"></div>
        <div className="rect rect4"></div>
        <div className="rect rect5"></div>
      </div>
    </div>
  );
}
