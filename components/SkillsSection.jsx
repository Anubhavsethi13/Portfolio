import React, { useState } from 'react';
import { skillCategories } from '../data/skills';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px 60px',
    }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ width: '28px', height: '2px', background: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Technical Skills & Categorized Toolkit
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '20px',
      }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: activeCategory === 'all' ? 'var(--accent)' : 'var(--surface-2)',
            color: activeCategory === 'all' ? 'var(--accent-contrast)' : 'var(--text)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
        >
          All Categories
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: activeCategory === cat.id ? 'var(--accent)' : 'var(--surface-2)',
              color: activeCategory === cat.id ? 'var(--accent-contrast)' : 'var(--text)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grouped Glass Panels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {filteredCategories.map((group) => (
          <div
            key={group.id}
            style={{
              background: 'var(--surface-card)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--window-shadow)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Panel Title Bar */}
            <div style={{
              height: '38px',
              background: 'var(--surface-2)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                {group.label}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>
                {group.skills.length} Technologies
              </span>
            </div>

            {/* Panel Body: Compact Chips */}
            <div style={{
              padding: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: skill.core ? 'var(--accent-dim)' : 'var(--surface-2)',
                    border: skill.core ? '1px solid var(--border-hover)' : '1px solid var(--border)',
                    boxShadow: skill.core ? '0 0 6px var(--accent-dim)' : 'none',
                    transition: 'transform 0.15s, border-color 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {skill.core && (
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)' }} />
                    )}
                    <span style={{ fontSize: '13px', fontWeight: skill.core ? 700 : 500, color: 'var(--text)' }}>
                      {skill.name}
                    </span>
                  </div>
                  {skill.note && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {skill.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
