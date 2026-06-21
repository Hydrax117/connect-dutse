export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center">
      {" "}
      <div className="space-y-4 px-4 text-center">
        {" "}
        <h1 className="text-4xl font-bold" style={{ color: "var(--color-brand-800)" }}>
          {" "}
          Connect Dutse{" "}
        </h1>{" "}
        <p style={{ color: "var(--color-text-secondary)" }} className="max-w-md text-lg">
          {" "}
          Find trusted services and products near you in Dutse, Jigawa State.{" "}
        </p>{" "}
        <p style={{ color: "var(--color-text-disabled)" }} className="text-sm">
          {" "}
          ≡ƒÜº Under construction ΓÇö coming soon.{" "}
        </p>{" "}
      </div>{" "}
    </main>
  );
}
