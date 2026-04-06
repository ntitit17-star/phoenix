import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Newspaper, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: 'სიახლე' | 'ბლოგი';
  author?: string;
}

export const NewsSection = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(6));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsItem[];
      setItems(newsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;
  if (items.length === 0) return null;

  const newsItems = items.filter(item => item.category === 'სიახლე');
  const blogItems = items.filter(item => item.category === 'ბლოგი');

  return (
    <>
      {/* News Section */}
      <section id="news" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-3">
                <Newspaper className="text-phoenix-cyan" />
                სიახლეები
              </h2>
              <div className="w-20 h-1 bg-phoenix-cyan rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 relative bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4 flex items-center gap-3">
                <BookOpen className="text-phoenix-orange" />
                ბლოგი
              </h2>
              <div className="w-20 h-1 bg-phoenix-orange rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogItems.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-[32px] border-white/5 overflow-hidden flex flex-col group hover:border-white/20 transition-all"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-phoenix-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(item.date).toLocaleDateString('ka-GE')}
          </div>
          {item.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {item.author}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-phoenix-cyan transition-colors leading-tight">
          {item.title}
        </h3>
        
        <p className="text-white/50 text-sm line-clamp-3 mb-8 leading-relaxed">
          {item.content}
        </p>
        
        <button className="mt-auto flex items-center gap-2 text-sm font-bold text-phoenix-cyan group/btn">
          სრულად ნახვა
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
