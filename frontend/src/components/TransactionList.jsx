import TransactionCard from "./TransactionCard";

export default function TransactionList({transactions}){
    return(
        <div className="flex flex-col gap-1">
            {transactions.map(transaction=>(
                <TransactionCard transaction={transaction} key={transaction.id}></TransactionCard>
            ))}
        </div>
    );
}