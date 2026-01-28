import React, { type FormEvent, type JSX, useRef } from "react";

const FindEventSection: React.FC = (): JSX.Element => {
  const searchElement = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
  };
  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      <p>Please enter a search term and to find events.</p>
    </section>
  );
};

export default FindEventSection;
