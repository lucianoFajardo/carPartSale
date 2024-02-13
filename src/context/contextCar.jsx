import { createContext, useContext, useState } from 'react';

const CarContext = createContext();

// eslint-disable-next-line react/prop-types
export const CardProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const selectCar = (id) => {
    setSelectedCar(id === selectedCar ? null : id);
  };

  return (
    <CarContext.Provider value={{ selectedCar, selectCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};
