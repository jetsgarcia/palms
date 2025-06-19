export default function Footer() {
  return (
    <footer className="w-full border-t bg-background px-4">
      <div className="container mx-auto grid place-items-center py-2">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} PALMS | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
