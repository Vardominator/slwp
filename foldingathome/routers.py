class FahRouter(object):
    """
    A router to control all databased operations on models in
    the FAH application.
    """

    def db_for_read(self, model, **hints):
        """
        Suggest the database that should be used for read operations
        in objects of type model.  
        """
        if model._meta.app_label == 'projectlist':
            return 'projectlist'
        elif model._meta.app_label == 'bche':
            return 'bche'
        return None

    def db_for_write(self, model, **hints):
        """
        Suggest the database that should be used for writes of objects
        of type model.
        """
        if model._meta.app_label == 'projectlist':
            return 'projectlist'
        elif model._meta.app_label == 'bche':
            return 'bche'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Returns True if a relation between obj1 and obj2 should be allowed.
        False if the relation should be prevented.
        None if the router has no opinion.
        """
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Determine if the migration operation is allowed to run the database
        with alias db.
        """
        return True