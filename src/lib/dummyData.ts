import qrImage from '../assets/qr.jpeg';

export const users = [
  { id: 1, name: 'Aryan Sharma', phone: '9876543210', otp: '482910' },
  { id: 2, name: 'Priya Mehta', phone: '9123456780', otp: '371042' },
  { id: 3, name: 'Rohan Das', phone: '9988776655', otp: '219384' },
  { id: 4, name: 'Sneha Patel', phone: '9001234567', otp: '593021' },
  { id: 5, name: 'Karan Verma', phone: '9871122334', otp: '748203' },
]

export const upiList = [
  { id: 1, label: 'UPI 1', url: qrImage },
  { id: 2, label: 'UPI 2', url: qrImage },
  { id: 3, label: 'UPI 3', url: qrImage },
]

export const bankAccounts = [
  { id: 1, name: 'NovaPay Pvt Ltd', account: '1234567890', ifsc: 'HDFC0001234', bank: 'HDFC Bank' },
  { id: 2, name: 'NovaPay Pvt Ltd', account: '9876543210', ifsc: 'ICIC0009876', bank: 'ICICI Bank' },
  { id: 3, name: 'NovaPay Pvt Ltd', account: '1122334455', ifsc: 'SBIN0011223', bank: 'SBI' },
]

export const tokenTransactions = [
  { id: 1, date: '2024-03-10', type: 'Received', amount: '+500 iTK', status: 'Success' },
  { id: 2, date: '2024-03-09', type: 'Sent', amount: '-200 iTK', status: 'Success' },
  { id: 3, date: '2024-03-08', type: 'Received', amount: '+1000 iTK', status: 'Pending' },
  { id: 4, date: '2024-03-07', type: 'Sent', amount: '-50 iTK', status: 'Success' },
  { id: 5, date: '2024-03-06', type: 'Received', amount: '+300 iTK', status: 'Failed' },
]

export const usdtTransactions = [
  { id: 1, date: '2024-03-10', type: 'Deposit', amount: '+$500', status: 'Success' },
  { id: 2, date: '2024-03-09', type: 'Withdraw', amount: '-$200', status: 'Success' },
  { id: 3, date: '2024-03-08', type: 'Swap', amount: '$1000 → iTK', status: 'Pending' },
  { id: 4, date: '2024-03-07', type: 'Deposit', amount: '+$750', status: 'Success' },
  { id: 5, date: '2024-03-06', type: 'Withdraw', amount: '-$100', status: 'Failed' },
]

export const orders = [
  { id: 1, date: '2024-03-10', asset: 'Bitcoin', type: 'Buy', amount: '$500', status: 'Completed' },
  { id: 2, date: '2024-03-09', asset: 'Ethereum', type: 'Sell', amount: '$300', status: 'Completed' },
  { id: 3, date: '2024-03-08', asset: 'iToken', type: 'Buy', amount: '$150', status: 'Pending' },
  { id: 4, date: '2024-03-07', asset: 'Bitcoin', type: 'Sell', amount: '$900', status: 'Completed' },
  { id: 5, date: '2024-03-06', asset: 'Ethereum', type: 'Buy', amount: '$420', status: 'Failed' },
]

export const miningStats = {
  hashRate: '142.5 MH/s',
  earningsToday: '0.00042 iTK',
  totalMined: '12.84 iTK',
  progress: 68,
  status: 'Active',
}
