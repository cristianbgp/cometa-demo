export default function Header({ school }) {
  const initialSchoolName = school.name[0].toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-center bg-white py-4 shadow-lg">
      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 p-1">
        <span className="text-center font-bold text-white">
          {initialSchoolName}
        </span>
      </div>
      <h1 className="text-xl font-light">{school.name}</h1>
    </header>
  );
}
