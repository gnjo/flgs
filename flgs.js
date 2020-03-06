/*
let a=flgs(ary,code,'-')
a.set(key)
a.unset(key)
a.get() //code
a.getmap() //[[key,flg],....]
*/

;(function(root){
;(function(root){
 let is=root.is||{},fn=root.fn||{}
 ;
 is.is=function(d){return (d||d===0)}
 is.string = function(obj){return toString.call(obj) === '[object String]'} //
 fn.deep=d=>JSON.parse(JSON.stringify(d));
 fn.clone=fn.deep
 fn.arraychunk=fn.arrayChunk = ([...array], size = 1) => {
  return array.reduce((acc, value, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
 }
 ;
 root.is=is
 root.fn=fn
})(this); 
 //
 let flg30=function entry(ary,value){
 const limit=30,rdx=16
 if(ary.length>limit+1)return console.log('too much array limit 50')
 let o={}
 o.pad=(d)=>{return ('00000000'+d).slice(-8) }
 o.ary=ary.slice(0,limit)
 o.bitflg=parseInt(value,rdx) //Base64.toNumber(value)
 o.bitary=Array.from({length:limit}).map((d,i)=> Math.pow(2,i) )
 o.set=(key)=>{
  let i=o.ary.indexOf(key)
  if(i===-1)return console.log('key not found',key),false
  if(!(o.bitflg & o.bitary[i]))o.bitflg+=o.bitary[i]
  //console.log(o.bitflg & o.bitary[i],o.bitflg)
  return true
 }
 o.get=()=>{return o.pad( o.bitflg.toString(16) ) }
 o.getmap=()=>{return o.ary.map((d,i)=>[d,o.isflgi(i)])}
 o.unset=(key)=>{
  let i=o.ary.indexOf(key)
  if(i===-1)return console.log('key not found',key),false
  if(o.bitflg & o.bitary[i])return o.bitflg-=o.bitary[i]
  return false
 }
 o.isflgi=(i)=>{
  if(o.bitary[i]===void 0)return console.log('index out of range',i),false
  return (o.bitflg & o.bitary[i])?true:false
 }
 o.isflg=(key)=>{return o.isflgi(o.ary.indexOf(key))}
  return o;
}
 ////
 let flgs=function entry(ary,code,chunk){
  if(chunk===void 0) chunk='-'
  let o={}
  o.max=30,o.zero='00000000'
  o.ary=ary  
  o.codes=code.split(chunk)
  o.slots=fn.arraychunk(o.ary,o.max).map((d,i)=>flg30(d, o.codes[i]||o.zero ))
  o.getslot=(v)=>{
   let n=o.ary.indexOf(v)
   if(n===-1)return -1
   return Math.floor(n/o.max)
  }
  o.set=(v)=>{
   let n=o.getslot(v)
   if(n===-1)return false;
   return o.slots[n].set(v)   
  }
  o.unset=(v)=>{
   let n=o.getslot(v)
   if(n===-1)return false;
   return o.slots[n].unset(v)   
  }
  o.isflg=(v)=>{
   let n=o.getslot(v)
   if(n===-1)return false;
   return o.slots[n].isflg(v)    
  }
  o.get=()=>{ return o.slots.map(d=>d.get()).join(chunk)}
  o.getmap=()=>{return o.slots.map(d=>d.getmap()).flat()}
  return o;
 }
 root.flgs=flgs
 root.flg30=flg30
})(this);
