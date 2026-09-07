import TransactionCard from "./TransactionCard";

export default function TransactionList({transactions, handleGetPaylet=null, onDeleteSuccess}){
    return(
        <div className="flex flex-col gap-1">
            {transactions.map(transaction=>(
                <TransactionCard transaction={transaction} handleGetPaylet={handleGetPaylet}
                onDeleteSuccess={onDeleteSuccess}
                key={transaction.id}></TransactionCard>
            ))}
        </div>
    );
}