export function formatMessageTime(date){
return new Date(date).toLocaleTimeString("en-US",{
    month:"2-digit",
    day:"2-digit",
    hour:"2-digit",
    minute:"2-digit",
    hour12: false,
    
}
 )}