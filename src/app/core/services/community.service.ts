import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import type { CommunityData, CommunityPostFull, Comment } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private readonly api = inject(ApiService);

  getCommunityData(): Observable<CommunityData> {
    return this.api.get<CommunityData>('/community');
  }

  getPosts(category?: string, tag?: string): Observable<CommunityPostFull[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (tag) params.append('tag', tag);
    const queryString = params.toString();
    return this.api.get<CommunityPostFull[]>(queryString ? `/community/posts?${queryString}` : '/community/posts');
  }

  getPost(id: string): Observable<CommunityPostFull> {
    return this.api.get<CommunityPostFull>(`/community/posts/${id}`);
  }

  createPost(post: Omit<CommunityPostFull, 'id' | 'createdAt' | 'author'>): Observable<CommunityPostFull> {
    return this.api.post<CommunityPostFull>('/community/posts', post);
  }

  updatePost(id: string, post: Partial<CommunityPostFull>): Observable<CommunityPostFull> {
    return this.api.put<CommunityPostFull>(`/community/posts/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.api.delete<void>(`/community/posts/${id}`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.api.get<Comment[]>(`/community/posts/${postId}/comments`);
  }

  createComment(postId: string, comment: Omit<Comment, 'id' | 'postId'>): Observable<Comment> {
    return this.api.post<Comment>(`/community/posts/${postId}/comments`, comment);
  }

  likePost(id: string): Observable<{ likes: number }> {
    return this.api.post<{ likes: number }>(`/community/posts/${id}/like`, {});
  }

  unlikePost(id: string): Observable<{ likes: number }> {
    return this.api.post<{ likes: number }>(`/community/posts/${id}/unlike`, {});
  }
}
