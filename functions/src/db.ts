import { queryRef, queryFilterRef } from "./helpers";
import { db } from "./index";

export async function getDbItems(dbName: string, query?: any): Promise<{ data: any[], totalCount: number }> {
  let collectionRef = await db.collection(dbName); 
  
  let countRef = queryFilterRef(collectionRef, query);
  const countSnapshot = await countRef.count().get();
  const totalCount = countSnapshot.data().count;

  collectionRef = queryRef(collectionRef, query);
  const itemsRef = await collectionRef.get();

  const data: any[] = [];
  itemsRef?.forEach((doc: any) => {
    data.push({id: doc.id, ...doc.data()})
  });

  return { data, totalCount };
};

export const getDbItem = async (dbName: string, id: string): Promise<any> => new Promise((resolve, reject) => {
  db.collection(dbName).doc(id).get().then((snapshot: any) => {
    if (snapshot.exists) {
      resolve({id: snapshot.id, ...snapshot.data()})
    }else {
      reject(`Id '${id}' not found in '${dbName}' DB`);
    }
  });
})

export async function addDbItem(dbName: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).add({
    ...data,
    lastUpdated: Date.now(),
    timestamp: Date.now(),
  });
  return {id: snapshot.id}
}

export async function editDbItem(dbName: string, id: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).doc(id).set({
    ...data,
    lastUpdated: Date.now(),
  });
  return {id: snapshot.id}
}

export async function mergeDbItem(dbName: string, id: string, data: any) {
  delete data['id']
  const snapshot = await db.collection(dbName).doc(id).set({
    ...data,
    lastUpdated: Date.now(),
  }, { merge: true });
  return {id: snapshot.id}
}

export async function deleteDbItem(dbName: string, id: string) {
  const snapshot = await db.collection(dbName).doc(id).delete();
  return {id: snapshot.id}
};

export const bulkDeleteDbItems = async (dbName: string, query?: any): Promise<void> => new Promise(async (resolve, reject) => {
  let collectionRef = await db.collection(dbName); 
  collectionRef = queryRef(collectionRef, query);
  const itemsRef = await collectionRef.get();
  let len = 0;
  if (itemsRef.size === 0) {
    resolve();
  };
  itemsRef?.forEach(async (doc: any) => {
    await db.collection(dbName).doc(doc.id).delete();
    
    len++;
    if (len+1 === itemsRef.size) {
      resolve();
    }
  });
});
