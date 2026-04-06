import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  X, 
  Save,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Tag,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: 'სიახლე' | 'ბლოგი';
  author?: string;
}

export const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: 'სიახლე' as 'სიახლე' | 'ბლოგი',
    author: ''
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'ntitit17@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubscribeNews = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsItem[];
      setNews(newsData);
    }, (err) => {
      console.error("Error fetching news:", err);
      setError("სიახლეების ჩატვირთვა ვერ მოხერხდა");
    });

    return () => {
      unsubscribeAuth();
      unsubscribeNews();
    };
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, `news-images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, image: url }));
      setSuccess("სურათი წარმატებით აიტვირთა");
    } catch (err) {
      console.error("Upload error:", err);
      setError("სურათის ატვირთვა ვერ მოხერხდა");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.content || !formData.image) {
      setError("გთხოვთ შეავსოთ ყველა აუცილებელი ველი");
      return;
    }

    try {
      if (editingId) {
        const newsRef = doc(db, 'news', editingId);
        await updateDoc(newsRef, {
          ...formData,
          date: new Date().toISOString()
        });
        setSuccess("სიახლე წარმატებით განახლდა");
      } else {
        await addDoc(collection(db, 'news'), {
          ...formData,
          id: Date.now().toString(),
          date: new Date().toISOString()
        });
        setSuccess("სიახლე წარმატებით დაემატა");
      }
      closeModal();
    } catch (err) {
      console.error("Submit error:", err);
      setError("ოპერაცია ვერ მოხერხდა");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("ნამდვილად გსურთ წაშლა?")) return;

    try {
      await deleteDoc(doc(db, 'news', id));
      setSuccess("სიახლე წარმატებით წაიშალა");
    } catch (err) {
      console.error("Delete error:", err);
      setError("წაშლა ვერ მოხერხდა");
    }
  };

  const openModal = (item?: NewsItem) => {
    if (item) {
      setFormData({
        title: item.title,
        content: item.content,
        image: item.image,
        category: item.category,
        author: item.author || ''
      });
      setEditingId(item.id);
    } else {
      setFormData({
        title: '',
        content: '',
        image: '',
        category: 'სიახლე',
        author: ''
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-phoenix-cyan animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-phoenix-magenta mb-4" />
        <h1 className="text-2xl font-bold mb-2">წვდომა აკრძალულია</h1>
        <p className="text-white/60">ამ გვერდის სანახავად საჭიროა ადმინისტრატორის უფლებები.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">ადმინ პანელი</h1>
            <p className="text-white/50">მართეთ სიახლეები და ბლოგის პოსტები</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-phoenix-cyan text-phoenix-navy font-bold rounded-xl hover:bg-phoenix-cyan/80 transition-all"
          >
            <Plus className="w-5 h-5" />
            ახალი პოსტი
          </button>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-phoenix-magenta/10 border border-phoenix-magenta/20 rounded-xl flex items-center gap-3 text-phoenix-magenta"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-500"
            >
              <CheckCircle2 className="w-5 h-5" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="glass rounded-3xl border-white/5 overflow-hidden flex flex-col group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.category === 'სიახლე' ? 'bg-phoenix-cyan text-phoenix-navy' : 'bg-phoenix-orange text-white'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('ka-GE')}
                  </div>
                  {item.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.author}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-white/50 text-sm line-clamp-3 mb-6">{item.content}</p>
                
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                  <button
                    onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-bold"
                  >
                    <Pencil className="w-4 h-4" />
                    რედაქტირება
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-phoenix-magenta/10 text-phoenix-magenta hover:bg-phoenix-magenta/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {news.length === 0 && (
          <div className="text-center py-20 glass rounded-[40px] border-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">პოსტები არ მოიძებნა</h3>
            <p className="text-white/40">დაამატეთ თქვენი პირველი სიახლე ან ბლოგი</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-phoenix-navy/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass rounded-[32px] border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">
                  {editingId ? 'პოსტის რედაქტირება' : 'ახალი პოსტი'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-white/5 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      კატეგორია
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-phoenix-cyan outline-none transition-all appearance-none"
                    >
                      <option value="სიახლე">სიახლე</option>
                      <option value="ბლოგი">ბლოგი</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      ავტორი (სურვილისამებრ)
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="ავტორის სახელი"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-phoenix-cyan outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60">სათაური</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="შეიყვანეთ სათაური"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-phoenix-cyan outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60">შინაარსი</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="დაწერეთ პოსტის შინაარსი..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-phoenix-cyan outline-none transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60">სურათი</label>
                  <div className="flex flex-col gap-4">
                    {formData.image && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute top-2 right-2 p-2 bg-phoenix-navy/80 rounded-full hover:bg-phoenix-magenta transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="სურათის URL ან ატვირთეთ"
                        className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-phoenix-cyan outline-none transition-all"
                      />
                      <label className="cursor-pointer flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <ImageIcon className="w-5 h-5" />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-4 rounded-2xl bg-white/5 font-bold hover:bg-white/10 transition-all"
                  >
                    გაუქმება
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-phoenix-cyan text-phoenix-navy font-bold hover:bg-phoenix-cyan/80 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    შენახვა
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
