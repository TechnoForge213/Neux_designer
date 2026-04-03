export const FloatingElements = () => {
  return (
    <>
      {/* Floating glowing orbs with enhanced effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float shadow-[0_0_60px_rgba(var(--primary),0.3)]" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float shadow-[0_0_80px_rgba(var(--secondary),0.3)]" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-float shadow-[0_0_40px_rgba(var(--primary),0.2)]" style={{ animationDelay: '0.5s', animationDuration: '5s' }} />
      <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-secondary/15 rounded-full blur-3xl animate-float shadow-[0_0_70px_rgba(var(--secondary),0.2)]" style={{ animationDelay: '2s', animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float shadow-[0_0_90px_rgba(var(--primary),0.15)]" style={{ animationDelay: '1.5s', animationDuration: '7s' }} />
    </>
  );
};
