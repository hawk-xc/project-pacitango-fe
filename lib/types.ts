export type Complaint = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Pending' | 'Diproses' | 'Diselesaikan';
  location: string;
  imageUrl?: string;
};
