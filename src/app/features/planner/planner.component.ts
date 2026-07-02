import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './planner.html',
  styleUrls: ['./planner.scss'],
})
export class PlannerComponent {
  state = inject(AppStateService);
  private readonly toast = inject(ToastService);
  showAdd = signal(false);
  statusFilter = signal('All');
  currentMonth = signal(new Date());

  newTask = { title: '', category: 'other', priority: 'medium', dueDate: '' };

  statusFilters = ['All', 'Pending', 'In Progress', 'Done'];
  categoryColors: Record<string, string> = {
    planting: 'badge-success', irrigation: 'badge-info', harvesting: 'badge-primary',
    spraying: 'badge-warning', fertilizing: 'badge-accent', other: 'badge-neutral',
  };

  filteredTasks() {
    return this.state.tasks().filter(t => {
      if (this.statusFilter() === 'All') return true;
      if (this.statusFilter() === 'Pending') return t.status === 'pending';
      if (this.statusFilter() === 'In Progress') return t.status === 'in-progress';
      if (this.statusFilter() === 'Done') return t.status === 'done';
      return true;
    });
  }

  cycleStatus(id: string) {
    const cycle: Record<string, string> = { pending: 'in-progress', 'in-progress': 'done', done: 'pending' };
    this.state.tasks.update(ts => ts.map(t => t.id === id ? { ...t, status: cycle[t.status] as any } : t));
    this.toast.success('Task status updated.');
  }

  deleteTask(id: string) {
    this.state.tasks.update(ts => ts.filter(t => t.id !== id));
    this.toast.warning('Task removed.');
  }

  addTask() {
    if (!this.newTask.title) return;
    this.state.tasks.update(ts => [...ts, { ...this.newTask, id: Date.now().toString() } as any]);
    this.newTask = { title: '', category: 'other', priority: 'medium', dueDate: '' };
    this.showAdd.set(false);
    this.toast.success('Task added successfully.');
  }

  addAiSuggestion(title: string) {
    this.state.tasks.update(ts => [...ts, { id: Date.now().toString(), title, category: 'other', priority: 'medium', dueDate: '2026-07-15', status: 'pending' } as any]);
    this.toast.info('AI suggestion added to your planner.');
  }

  monthYear() {
    return this.currentMonth().toLocaleDateString('en', { month: 'long', year: 'numeric' });
  }

  prevMonth() { const d = new Date(this.currentMonth()); d.setMonth(d.getMonth() - 1); this.currentMonth.set(d); }
  nextMonth() { const d = new Date(this.currentMonth()); d.setMonth(d.getMonth() + 1); this.currentMonth.set(d); }

  calendarDays() {
    const m = this.currentMonth();
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const last = new Date(m.getFullYear(), m.getMonth() + 1, 0);
    const days = [];
    const today = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    const taskDates = this.state.tasks().map(t => parseInt(t.dueDate.split('-')[2]));

    for (let i = 0; i < first.getDay(); i++) {
      const prevDay = last.getDate() - first.getDay() + i + 1;
      days.push({ day: prevDay, date: `prev-${prevDay}`, isToday: false, hasTask: false, currentMonth: false });
    }
    for (let d = 1; d <= last.getDate(); d++) {
      days.push({
        day: d, date: `${m.getFullYear()}-${m.getMonth()}-${d}`,
        isToday: d === today && m.getMonth() === todayMonth && m.getFullYear() === todayYear,
        hasTask: taskDates.includes(d),
        currentMonth: true,
      });
    }
    return days;
  }

  monthAbbr(dateStr: string) {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(dateStr.split('-')[1]) - 1];
  }

  categoryBadge(c: string) { return this.categoryColors[c] || 'badge-neutral'; }
  priorityBadge(p: string) { const m: Record<string,string> = { high: 'badge-danger', medium: 'badge-warning', low: 'badge-neutral' }; return m[p]; }

  aiSuggestions = [
    { icon: 'water_drop', title: 'Schedule irrigation for Wednesday', desc: 'No rain expected Wednesday — maize needs water' },
    { icon: 'bug_report', title: 'Monitor tomatoes for early blight', desc: 'Risk elevated due to humid conditions' },
    { icon: 'compost', title: 'Top-dress maize with LAN fertilizer', desc: 'Optimal time based on crop growth stage' },
  ];
}
