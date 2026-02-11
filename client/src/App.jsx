import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { GlobalProvider } from './context/GlobalState'
import Header from './components/Header'
import Balance from './components/Balance'
import IncomeExpenses from './components/IncomeExpenses'
import TransactionList from './components/TransactionList'
import './App.css'

function App() {

  return (
    <>
      <GlobalProvider>
        <Header />
        <Balance />
        <IncomeExpenses />
        <TransactionList />
      </GlobalProvider>
    </>
  )
}

export default App
