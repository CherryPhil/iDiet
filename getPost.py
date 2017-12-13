class postObj():
    def __init__(self, title, comment):
        self.__title = title
        self.__comment = comment

    def get_title(self):
        return self.__title

    def get_comment(self):
        return self.__comment

    def set_title(self, title):
        self.__title = title

    def set_comment(self, comment):
        self.__comment = comment