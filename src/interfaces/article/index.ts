import { PublisherInterface } from 'interfaces/publisher';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  publisher_id?: string;
  editor_id?: string;
  reporter_id?: string;
  created_at?: any;
  updated_at?: any;

  publisher?: PublisherInterface;
  user_article_editor_idTouser?: UserInterface;
  user_article_reporter_idTouser?: UserInterface;
  _count?: {};
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  publisher_id?: string;
  editor_id?: string;
  reporter_id?: string;
}
